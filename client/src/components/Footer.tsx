import { Footer } from "flowbite-react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";
const FooterComponent = () => {
  return (
    <Footer className="py-10 border-t-2  border-orange-200">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="mt-5">
            <Link
              className="text- whitespace-nowrap text-lg font-semibold dark:text-white sm:text-xl"
              to="/"
            >
              <span className="rounded-lg bg-gradient-to-r from-pink-400 via-orange-600 to-rose-700 px-2 py-1 text-white">
                Ryd
              </span>
              Blog
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="O nas" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Przykład
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  O mnie
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Media" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.github.com/rydwan94"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Linkedin
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Dokumenty" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Regulamin</Footer.Link>
                <Footer.Link href="#">Polityka prywatności</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div>
          <Footer.Copyright
          className="text-center"
            href="#"
            by="Rydwan"
            year={new Date().getFullYear()}
          />
          <div className="flex justify-center gap-3 mt-3">
            <Footer.Icon className="hover:text-black transition-all" href="#" icon={BsGithub}/>
            <Footer.Icon className="hover:text-black transition-all" href="#" icon={BsLinkedin}/>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComponent;
