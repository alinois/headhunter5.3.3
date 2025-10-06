import { Button, Card, Group } from '@mantine/core'
import './NotFound.scss'
import cat from '../../../assets/sad-cat.gif'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
        <Card className='vac-card' radius='md'>
            <Group className='vac-card-info'>
                <Group className='vac-card-info-text'>
                    <h1 className='vac-card-info-text-title'>Упс! Такой страницы не существует</h1>
                    <span className='vac-card-info-text-descr'>Давайте перейдём к началу.</span>
                </Group>
                <Link className='vac-card-button' to='/'><Button radius='sm' size='md' variant="filled" color="indigo">На главную</Button></Link>
            </Group>
            <img className='sad-cat' src={cat} />
        </Card>
        </>
)}

export default NotFound