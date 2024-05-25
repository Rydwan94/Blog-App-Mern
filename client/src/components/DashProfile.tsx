import React from "react";
import { useAppSelector } from "../app/hooks";
import { Button, TextInput } from "flowbite-react";

const DashProfile = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  return (
    <div className="mx-auto w-full max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-bold">Profil</h1>
      <form className="flex flex-col gap-y-6">
        <div className="h-32 w-32 cursor-pointer self-center drop-shadow-md">
          <img
            src={currentUser.profilePicture}
            alt="profile Picture"
            className="h-full w-full rounded-full border-4 border-[lightgray] object-cover"
          />
        </div>
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
        <Button type="submit" className="self-center" gradientDuoTone="pinkToOrange" outline>
          Zaktualizuj
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Usuń konto</span>
        <span className="cursor-pointer">Wyloguj się</span>
      </div>
    </div>
  );
};

export default DashProfile;
