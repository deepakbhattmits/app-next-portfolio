/** @format */
import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { IProp } from '../interfaces'
import { Mail, MapPin, Phone, Rocket } from 'lucide-react'
// import styles from '../styles/ImageContainer.module.css';
const ImageContainer: FC<IProp> = ({
  user: { avatar_url, name, location },
}): JSX.Element => {
  return (
    <>
      {/* <DarkModeToggle /> */}
      <div className="ui img-container">
        <img
          className="ui circular image"
          src={avatar_url}
          alt="profile"
          width="80"
          height="80"
        />
        {/* <Image
          className="ui circular image"
          src={`${avatar_url}`}
          alt="profile"
          width={80}
          height={80}
        /> */}
      </div>
      <div className="description">
        <div className="">
          <div className="item p-2 text-center">
            <div className="text-2xl">{name}</div>
          </div>
          <div className="item flex p-2 gap-2 items-center">
            <Phone />
            <div className="content">+91 - 8660272372</div>
          </div>
          <div className="item flex p-2 gap-2 items-center">
            <MapPin />
            <div className="content">
              {!!location ? location : 'Bangalore'}, India
            </div>
          </div>
          <div className="item flex p-2 gap-2 items-center">
            <Mail />
            <div className="content">
              <a href="mailto:deepakbhattmits@gmail.com">
                deepakbhattmits@gmail.com
              </a>
            </div>
          </div>
          <div className="item flex p-2 gap-2 items-center">
            <Rocket />
            <div className="content">
              <Link legacyBehavior href="/Questions">
                <a className="">Question</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .img-container {
          display: flex;
          justify-content: center;
        }
        .img-container img.ui.circular.image:not([src='']) {
          background: #0003;
          color: transparent;
        }
        .img-container img.ui.circular.image:not([src='']):before {
          content: 'No Profile';
          color: #000;
          position: absolute;
          top: 35px;
        }
        .description .ui.list .header {
          text-align: center;
          margin: 5px 0;
          color: var(--color-primary);
        }
        .description .ui.list .item {
          margin: 5px 0;
        }
        .ui.list > .item a {
          word-break: break-word;
        }
      `}</style>
    </>
  )
}
export default ImageContainer
