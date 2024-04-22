import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="m-10 mt-20 min-h-screen sm:p-0">
      <div className="mx-auto flex max-w-3xl flex-col gap-x-10 md:flex-row md:items-center">
        <div className="flex-1">
          <Link
            className="whitespace-nowrap text-4xl font-bold dark:text-white"
            to="/"
          >
            <span className="rounded-lg bg-gradient-to-r from-pink-400 via-orange-600 to-rose-700 px-2 py-1 text-white">
              Take
            </span>
            Blog
          </Link>
          <p className="mt-5 text-justify text-sm">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
            quisquam molestias earum officiis nam inventore velit? Quia nesciunt
            quo beatae?
          </p>
        </div>
        <div className="mt-10 flex-1 sm:mt-0">
          <div>
            <form className="flex flex-col gap-y-4">
              <div>
                <Label value="Nazwa użytkownika" />
                <TextInput
                  className="pr-5"
                  type="text"
                  placeholder="Użytkownik"
                  id="username"
                />
              </div>
              <div>
                <Label value="Email" />
                <TextInput
                  className="pr-5"
                  type="text"
                  placeholder="name@company.com"
                  id="email"
                />
              </div>
              <div>
                <Label value="Hasło" />
                <TextInput
                  className="pr-5"
                  type="text"
                  placeholder="Hasło"
                  id="password"
                />
              </div>
              <Button
                className="p-0"
                gradientDuoTone="pinkToOrange"
                type="submit"
              >
                Zaloguj się
              </Button>
            </form>
            <div className="mt-5 flex gap-x-2 text-sm">
              <span>Masz już konto? </span>
              <Link to="/sing-ing" className="text-blue-500">
                Zaloguj się
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
