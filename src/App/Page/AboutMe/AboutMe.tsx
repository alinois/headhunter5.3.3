import { Card } from '@mantine/core'
import './AboutMe.scss'

const AboutMe = () => {
    return (
        <>
        <Card className='my-info' radius='md'>
            <h2 className='my-info-name'>Алина Корытько</h2>
            <p className='my-info-descr'>Я - гений, плейбой, мизантроп, но в костюме я просто Frontend-разработчик, пишущий приложения на React + TypeScript + Redux Toolkit. А ещё я не умею делать сальто. </p>
        </Card>
        </>
)}

export default AboutMe
