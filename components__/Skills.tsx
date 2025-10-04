/** @format */
import { FC } from 'react'
import { IProp } from '../interfaces'
const Skills: FC<IProp> = ({ skills }): JSX.Element => {
  return (
    <div className="skills">
      <div className="ui middle aligned list">
        {skills?.map(({ name, logo }, index) => (
          <div className="item" key={index}>
            <img
              className="ui avatar image"
              src={`./images/${logo}-logo.svg`}
              alt={name}
              width="15"
              height="15"
            />
            <div className="content">
              <a className="header">{name}</a>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .skills .ui.list > .item {
          box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
          width: 165px;
          margin: 0.4em;
          border-radius: 30px;
          padding: 0.5em;
        }
        .skills .ui.list {
          display: grid;
          align-items: center;
          justify-content: center;
        }
        .skills .ui.avatar.image {
          width: 1em;
          height: 1em;
        }
      `}</style>
    </div>
  )
}
export default Skills
