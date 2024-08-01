/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
  import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
  import { ChangeEvent, useEffect, useState } from "react";
  import ReactQuill from "react-quill";
  import "react-quill/dist/quill.snow.css";
  import { app } from "../firebase";
  import { CircularProgressbar } from "react-circular-progressbar";
  import "react-circular-progressbar/dist/styles.css";
  import { useNavigate, useParams } from "react-router";
import { useAppSelector } from "../app/hooks";
  
  interface FormData {
    _id?:string;
    userId?:string;
    image?: string;
    title?: string;
    category?: string;
    content?: string;
  }
  
  const UpdatePost = () => {
    const [file, setFile] = useState<File | null>(null);
    const [imageUploadProgress, setImageUploadProgress] = useState<any | null>(
      null,
    );
    const [imageUploadError, setImageUploadError] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({});
    const [publishError, setPublishError] = useState<string | null>("");

    const {postId} = useParams();

    const {currentUser} = useAppSelector((state) => state.user)
  
    const navigate = useNavigate();
    console.log(formData)
    useEffect(() => {
        const handleFetchPost = async () => {
            try {
                const res = await fetch(`/api/post/getposts?postId=${postId}`)
                const data = await res.json()
                if(!res.ok){
                    console.log(data.message)
                    setPublishError(data.message)
                    return;
                }else {
                    setPublishError(null)
                    setFormData(data.posts[0])
                }
            } catch (error) {
                console.log(error)
            }
        }

        handleFetchPost()
    },[postId])
  
    const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files;
      if (file) {
        setFile(file[0]);
      }
    };
  
    const handleUpdloadImage = async () => {
      try {
        if (!file) {
          setImageUploadError("Należy wybrać zdjęcie");
          return;
        }
        setImageUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + "-" + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress(progress.toFixed(0));
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (error: any) => {
            setImageUploadError("Nieudało się przesłać zdjęcia");
            setImageUploadProgress(null);
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUploadProgress(null);
              setImageUploadError(null);
              setFormData({ ...formData, image: downloadURL });
            });
          },
        );
      } catch (error) {
        setImageUploadError("Nieudało się przesłać zdjęcia");
        setImageUploadProgress(null);
        console.log(error);
      }
    };
  
    const handleOnSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const data = await res.json();
        console.log(data);
  
        if (!res.ok) {
          setPublishError(data.message);
          return;
        } else {
          setPublishError(null);
          navigate(`/post/${data.slug}`);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div className="mx-auto min-h-screen max-w-3xl p-3">
        <h1 className="my-7 text-center text-3xl font-semibold">Zaktualizuj Post</h1>
  
        <form className="flex flex-col gap-y-4" onSubmit={handleOnSubmit}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <TextInput
              type="text"
              placeholder="Tytuł"
              required
              id="title"
              className="mr-6 flex-1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData({ ...formData, title: e.target.value })
              }
              value={formData.title}
            />
            <Select
              className="mr-14"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFormData({ ...formData, category: e.target.value })
              }
              value={formData.category}
            >
              <option value="uncategorized">Wybierz kategorie</option>
              <option value="produkty">Produkty</option>
              <option value="dostawy">Dostawy</option>
              <option value="płatności">Płatności</option>
            </Select>
          </div>
          <div className="flex items-center justify-between gap-4 border-4 border-dotted border-teal-500 p-3">
            <FileInput onChange={handleAddImage} accept="image/*" />
            <Button
              type="button"
              gradientDuoTone="pinkToOrange"
              size="sm"
              outline
              onClick={handleUpdloadImage}
              disabled={imageUploadProgress}
            >
              {imageUploadProgress ? (
                <div className="h-16 w-16">
                  <CircularProgressbar
                    value={imageUploadProgress}
                    text={`${imageUploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Zaktualizuj zdjęcie"
              )}
            </Button>
          </div>
          {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
          {formData.image && (
            <img
              src={formData.image}
              alt="upload"
              className="h-72 w-full object-cover"
            />
          )}
          <ReactQuill
            theme="snow"
            value={formData.content}
            placeholder="Napisz coś...."
            className="mb-12 h-72"
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
          <Button type="submit" gradientDuoTone="pinkToOrange">
            Zaktualizuj
          </Button>
          {publishError && <Alert className="mt-5" color="alert">{publishError}</Alert>}
        </form>
      </div>
    );
  };
  
  export default UpdatePost;
  