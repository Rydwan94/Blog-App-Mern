import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInSucces, signInStart, signInFailure } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import OAuth from "../components/OAuth";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const {error, loading} = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.id]: target.value.trim() });
  };
  console.log(error)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Uzupełnij wszystkie pola'))
    }

    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message))
      }

      if (res.ok) {
        dispatch(signInSucces(data))
        navigate("/");
      } 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      dispatch(signInFailure(error.message))
    }
  };

  return (
    <div className="m-10 mt-20 min-h-screen sm:p-0">
      <div className="mx-auto flex max-w-3xl flex-col gap-x-10 md:flex-row md:items-center">
        <div className="flex-1">
          <Link
            className="whitespace-nowrap text-4xl font-bold dark:text-white"
            to="/"
          >
            <span className="rounded-lg bg-gradient-to-r from-pink-400 via-orange-600 to-rose-700 px-2 py-1 text-white">
              Ryd
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
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
             
              <div>
                <Label value="Email" />
                <TextInput
                  type="text"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Hasło" />
                <TextInput
                  type="password"
                  placeholder="*******"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <Button
                className="p-0"
                gradientDuoTone="pinkToOrange"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />{" "}
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Zaloguj się"
                )}
              </Button>
              <OAuth/>
            </form>
            <div className="mt-5 flex gap-x-2 text-sm">
              <span>Nie masz konta </span>
              <Link to="/sign-up" className="text-blue-500">
                Zarejestruj się
              </Link>
            </div>
            {error && (
              <Alert className="mt-5" color="failure">
                {error}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
