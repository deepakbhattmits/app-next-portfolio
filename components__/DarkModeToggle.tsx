/** @format */

import { FC, useEffect, useState } from 'react'

import { IProp } from '../interfaces'
const DarkModeToggle: FC<IProp> = (): JSX.Element => {
  const [darkTheme, setDarkTheme] = useState(undefined)

  const handleToggle = (event) => {
    setDarkTheme(event.target.checked)
  }

  useEffect(() => {
    const root = window.document.documentElement
    const initialColorValue = root.style.getPropertyValue(
      '--initial-color-mode',
    )
    // console.log('init', initialColorValue);

    setDarkTheme(initialColorValue === 'dark')
  }, [])
  useEffect(() => {
    if (darkTheme !== undefined) {
      if (darkTheme) {
        document.documentElement.setAttribute('data-theme', 'dark')
        window.localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme')
        window.localStorage.setItem('theme', 'light')
      }
    }
  }, [darkTheme])

  return (
    <>
      {darkTheme !== undefined && (
        <label className="switch">
          <input type="checkbox" checked={darkTheme} onChange={handleToggle} />
          <span className={`slider round ${darkTheme ? 'night' : 'day'}`}>
            {/* {darkTheme?<p>DAYMODE <i className='ui icon orange sun large outline' /></p>:<p><i className='ui icon moon large outline' />NIGHTMODE</p>} */}
            {darkTheme ? (
              <>
                <i className="ui icon sun outline" />
                <p>DAYMODE</p>
              </>
            ) : (
              <>
                <i className="ui icon moon outline" />
                <p>NIGHTMODE</p>
              </>
            )}
          </span>
        </label>
      )}
      <style jsx>{`
				.switch {
					right: 1.6em;
					width: 90px;
					height: 30px;
					margin: 0.5em 0;
					position: fixed;
					top: 0.2em;
					z-index:1;
				}
				.switch input {
					opacity: 0;
					width: 0;
					height: 0;
				}

				.slider {
					width: inherit;
					height: inherit;
					position: absolute;
					cursor: pointer;
					top: 0;
					background-color: #ccc;
					transition: 0.4s;
					display: flex;
					align-items: center;
				}
				// .slider .moon {
				// 	position: absolute;
				// 	right: 0;
				// }
				.slider:before {
					position: absolute;
					content: '';
					height: 26px;
					width: 26px;
					left: 4px;
					bottom: 2px;
					background-color: white;
					-webkit-transition: 0.4s;
					transition: 0.4s;
				}

				input:focus + .slider {
					box-shadow: 0 0 1px #2196f3;
				}

				input:checked + .slider:before {
					-webkit-transform: translateX(58px);
					-ms-transform: translateX(58px);
					transform: translateX(58px);
				}
				/* Rounded sliders */
				.slider.round {
					border-radius: 34px;
					
				}

				.slider.round:before {
					border-radius: 50%;
					-webkit-transform: translateX(-2px);
					-ms-transform: translateX(-2px);
					transform: translateX(-2px);
				}
				.night i {
					position: absolute;
					right: 6px;
					top:6px;
					color:#000;
					margin:0;
				}
				.night p {
					font-weight: bolder;
					font-size: 8px;
					text-indent: 14px;
					color: #000;
				}
				.day i {
					position: absolute;
					left: 7px;
					top: 6px;
				}
				.day p {
					font-weight: bolder;
					font-size: 8px;
					text-indent: 32px;
				
			`}</style>
    </>
  )
}
export default DarkModeToggle
