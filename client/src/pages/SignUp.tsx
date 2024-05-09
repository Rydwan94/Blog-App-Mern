import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.id]: target.value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Uzupełnij wszystkie pola");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) navigate("/sing-in");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.message);
      setLoading(false);
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
            <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
              <div>
                <Label value="Nazwa użytkownika" />
                <TextInput
                  className="pr-5"
                  type="text"
                  placeholder="Użytkownik"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Email" />
                <TextInput
                  className="pr-5"
                  type="text"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label value="Hasło" />
                <TextInput
                  className="pr-5"
                  type="password"
                  placeholder="Hasło"
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
                  "Zarejestruj się"
                )}
              </Button>
            </form>
            <div className="mt-5 flex gap-x-2 text-sm">
              <span>Masz już konto? </span>
              <Link to="/sign-in" className="text-blue-500">
                Zaloguj się
              </Link>
            </div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
