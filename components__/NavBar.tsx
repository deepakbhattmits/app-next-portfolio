/** @format */
import { FC } from "react";
import { IProp } from "../interfaces";
import Link from "next/link";
import { routes } from "../constants";
const NavBar: FC<IProp> = (): JSX.Element => {
  return (
    <header>
      {Object.entries(routes).map((el, index) => (
        <Link legacyBehavior key={index} href={el[0]}>
          {el[1]}
        </Link>
      ))}
    </header>
  );
};
export default NavBar;
