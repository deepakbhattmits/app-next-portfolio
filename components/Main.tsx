/** @format */
import { FC } from 'react'
import Card from './Card'
import { repos } from '../constants'
import { IProp } from '../interfaces'
const Main: FC<IProp> = (): JSX.Element => {
  return (
    <>
      <Card repos={repos} />
    </>
  )
}
export default Main
