/** @format */ import { FC } from 'react'
import Link from 'next/link'
import { IProp } from '../interfaces'
const Socials: FC<IProp> = ({ socials }): JSX.Element => {
  return (
    <div className="social">
      {socials?.map(({ name, icon, href }, index) => (
        <Link href={href} key={index}>
          <a
            target="_blank"
            title={name}
            className={`ui circular ${icon} icon button`}
          >
            <i className={`${icon} icon`}></i>
          </a>
        </Link>
      ))}
      <style jsx>{`
        .social {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 10px 0 0;
        }

        .social .ui.horizontal.list > .item > i.icon {
          width: 35px;
          height: 35px;
          padding: 0;
          justify-content: center;
          display: flex;
          align-items: center;
          background: #7726ed;
          border-radius: 100%;
          color: #fff;
        }
        .social .ui.circular.button:hover {
          box-shadow: 0 0 10px #000;
        }
      `}</style>
    </div>
  )
}
export default Socials
