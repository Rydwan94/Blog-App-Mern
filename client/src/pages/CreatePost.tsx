import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePost = () => {
  return (
    <div className="mx-auto min-h-screen max-w-3xl p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Stwórz Post</h1>
      <form className="flex flex-col gap-y-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <TextInput
            type="text"
            placeholder="Tytuł"
            required
            id="title"
            className="mr-6 flex-1"
          />
          <Select className="mr-14">
            <option value="uncategorized">Wybierz kategorie</option>
            <option value="javscript">JavaScript</option>
            <option value="react">React</option>
            <option value="Nextjs">Nextjs</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4 border-4 border-dotted border-teal-500 p-3">
          <FileInput
            accept="image/*"
            helperText="SVG, PNG lub JPG  (MAX. 800x400px)."
          />
          <Button
            type="button"
            gradientDuoTone="pinkToOrange"
            size="sm"
            outline
          >
            {" "}
            Dodaj zdjęcie{" "}
          </Button>
        </div>

        <ReactQuill
          theme="snow"
          placeholder="Napisz coś...."
          className="mb-12 h-72"
        />
        <Button type="submit" gradientDuoTone='pinkToOrange'>Publikuj</Button>
      </form>
    </div>
  );
};

export default CreatePost;
