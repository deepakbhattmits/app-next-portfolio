/** @format */
import { FC } from 'react'
import { IProp } from '../interfaces'
import ImageContainer from './ImageContainer'
import Skills from './Skills'
import Socials from './Socials'
import useWindowDimensions from '../hooks/useWindowDimensions'

const SideBar: FC<IProp> = ({
  user,
  skills,
  socials,
  setIsActive,
}): JSX.Element => {
  const { width } = useWindowDimensions()
  return (
    <>
      <ImageContainer user={user} />
      {width <= 640 && (
        <button
          className="close-button"
          onClick={() => {
            setIsActive(false)
          }}
        >
          close
        </button>
      )}
      <Skills skills={skills} />
      <Socials socials={socials} />
      <style jsx>{`
        .close-button {
          background: var(--color-btn-background);
          color: #fff;
          border: 2px solid var(--color-btn-background);
          border-radius: 50px;
          padding: 0.5em;
          position: absolute;
          top: 10px;
          right: 10px;
        }
        .close-button:hover {
          background: #fff;
          color: var(--color-btn-background);
          border: 2px solidvar(--color-btn-background);
        }
      `}</style>
    </>
  )
}
export default SideBar
