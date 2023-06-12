import { Stack, Text } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as SuccessIcon} from '../../../assets/SuccessIcon.svg'
import {ReactComponent as Cancel} from '../../../assets/Cancel.svg'
import {ReactComponent as Exclamation} from '../../../assets/Exclamation.svg'
import { ORDER_STATUS_TINTS } from '../../../constants'

const IconStyle = {
    height: '35px',
    width: '35px',
    borderRadius:'50%'
}

const Waves = (props) => {
 const message = props.paymentstatus === 'PNDG' ? 'Payment Pending': props.paymentstatus === 'SXS' ? 'Payment Success!' : 'Payment Failed!'
 const statusIcon =  props.paymentstatus === 'PNDG' ? <Exclamation style={{...IconStyle,height:'100px'}} /> : props.paymentstatus === 'SXS' ? <SuccessIcon style={IconStyle}/> : <Cancel style={IconStyle}/>
  return (
    <Stack style={{borderRadius:'1rem',background:'#fff'}} align='center' py={16}> 
        <div style={{display:'grid',placeItems:'center',width:'75px',height:'75px',borderRadius:'50%',background: ORDER_STATUS_TINTS[props.paymentstatus]}}>
            {statusIcon}
        </div>
        <Text align='center' size={'lg'} fw={500}  sx={(theme) => ({color: theme.colors.dark[3]})}>{message}</Text>
        <Text align='center' color='dark' size={28} fw={500}>{props.amount} INR</Text>
    </Stack>
  )
}

export default Waves

