/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppSelector } from "../app/hooks";
import { Alert, Button, TextInput } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >(null);
  const [imageFileUploadError, setImageFileUploadError] = useState<
    string | null
  >(null);

  const filePicker = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      console.log(imageFile, imageFileUrl);
    }
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  console.log(imageFileUploadProgress, imageFileUploadError)
  const uploadImage = async () => {
    if (!imageFile) {
      console.error("imageFile is null or undefined");
      return;
    }
    setImageFileUploadError(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile?.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Nie można zaktualizować zdjęcia. (Plik nie może przekraczać 2mb)",
        );
        setImageFileUploadProgress(null)
        setImageFile(null)
        setImageFileUrl(null)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageFileUrl(downloadUrl);
        });
      },
    );
  };
  return (
    <div className="mx-auto w-full max-w-[90%] sm:max-w-lg sm:p-4">
      <h1 className="my-7 text-center text-3xl font-bold">Profil</h1>
      <form className="flex flex-col gap-y-6">
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePicker}
        />
        <div
          className="relative h-32 w-32 cursor-pointer self-center drop-shadow-md"
          onClick={() => filePicker.current?.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`} strokeWidth={5} styles={{
              root: {
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              },
              path: {
                stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100})`
              }
            }}/>
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="profile Picture"
            className={`h-full w-full rounded-full border-3 border-[lightgray] object-cover ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color='failure'>
            {imageFileUploadError}
          </Alert>
        ) }
        
        <TextInput
          className="mr-6"
          type="text"
          id="username"
          placeholder="Nazwa użytkownika"
          defaultValue={currentUser.username}
        />
        <TextInput
          className="mr-6"
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
        />
        <TextInput
          className="mr-6"
          type="password"
          id="password"
          placeholder="Hasło"
        />
        <Button
          type="submit"
          className="self-center"
          gradientDuoTone="pinkToOrange"
          outline
        >
          Zaktualizuj
        </Button>
      </form>
      <div className="mt-5 flex justify-between text-red-500">
        <span className="cursor-pointer">Usuń konto</span>
        <span className="cursor-pointer">Wyloguj się</span>
      </div>
    </div>
  );
};

export default DashProfile;
