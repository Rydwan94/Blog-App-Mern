/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Alert, Button, Modal, Spinner, TextInput } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateSucces,
  upadateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
} from "../features/user/userSlice";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const DashProfile = () => {
  const { currentUser, loading, error } = useAppSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileUrl, setImageFileUrl] = useState<string | null>(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState<string | null>(
    null,
  );
  const [updateUserError, setUpdateUserError] = useState<string | null>(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState<
    any | null
  >(null);
  const [imageFileUploadError, setImageFileUploadError] = useState<
    string | null
  >(null);
  const [showModal, setShowModal] = useState(false);

  const filePicker = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

 

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    if (!imageFile) {
      console.error("imageFile is null or undefined");
      return;
    }
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    setFormData({ ...formData, [id]: value });
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('Nie zostały dokonane zmiany');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Proszę poczekąc na aktualizacje zdjęcia');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(upadateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSucces(data));
        setUpdateUserSuccess("Aktualizacja przebiegła pomyślnie");
      }
    } catch (error:any) {
      dispatch(upadateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);

    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json()

      if(!res.ok) {
        dispatch(deleteUserFailed(data.message))
      }else {
        dispatch(deleteUserSuccess(data))
      }
    } catch (error:any) {
      dispatch(deleteUserFailed(error.message))
    }
  };

  return (
    <div className="mx-auto w-full max-w-[90%] sm:max-w-lg sm:p-4">
      <h1 className="my-7 text-center text-3xl font-bold">Profil</h1>
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-6">
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
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199, ${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="profile Picture"
            className={`border-3 h-full w-full rounded-full border-[lightgray] object-cover ${imageFileUploadProgress && imageFileUploadProgress < 100 && "opacity-60"}`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}

        <TextInput
          className="mr-6"
          type="text"
          id="username"
          placeholder="Nazwa użytkownika"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          className="mr-6"
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          className="mr-6"
          type="password"
          id="password"
          placeholder="Hasło"
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="self-center"
          gradientDuoTone="pinkToOrange"
          outline
          disabled={loading}
        >
          {loading && <Spinner />} Zaktualizuj
        </Button>
      </form>
      <div className="mt-5 flex justify-between text-red-500">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Usuń konto
        </span>
        <span className="cursor-pointer">Wyloguj się</span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color="failure" className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color="failure" className="mt-5">
          {error}
        </Alert>
      )}
      {showModal && (
        <Modal
          className="animate-fade backdrop-blur-md"
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg text-gray-400 dark:text-gray-400">
                Czy jesteś pewny, że chcesz usunąć konto?
              </h3>
              <div className="flex justify-center gap-x-4">
                <Button color="failure" onClick={handleDeleteUser}>
                  Tak
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  Nie
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default DashProfile;
