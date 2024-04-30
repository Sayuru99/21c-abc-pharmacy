import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

export function Footer({ brandName, brandLink }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year},  by{" "}
          <a
            href='https://www.21ccare.com/'
            target="_blank"
            className="transition-colors hover:text-blue-500 font-bold"
          >
            21c - Care
          </a>{" "}
          All right reserved
        </Typography>
      </div>
    </footer>
  );
}



Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
