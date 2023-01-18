import { Text } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as SuccessIcon} from '../../../assets/SuccessIcon.svg'
import {ReactComponent as Cancel} from '../../../assets/Cancel.svg'
import {ReactComponent as Exclamation} from '../../../assets/Exclamation.svg'

const IconStyle = {
    position:'absolute',
    top:'40%',
    left:'50%',
    transform: 'translate(-50%,-50%)',
    height: '110px',
    width: '110px',
    borderRadius:'50%'
}

const Waves = (props) => {

 const colorOfWaves = props.paymentstatus === 'PNDG' ? '#f9b200': props.paymentstatus === 'SXS' ? '#00d084' : '#f44336'
 const statusIcon =  props.paymentstatus === 'PNDG' ? <Exclamation style={{...IconStyle,height:'100px'}} /> : props.paymentstatus === 'SXS' ? <SuccessIcon style={IconStyle}/> : <Cancel style={IconStyle}/>
  return (
    <div style={{overflow:'hidden',position:'relative'}}>
        <svg
            width="100%"
            height={400}
            style={{transform:'scaleY(3.5)'}}
            id="svg"
            viewBox="0 0 1440 700"
            xmlns="http://www.w3.org/2000/svg"
            className="transition duration-300 ease-in-out delay-150"
            {...props}
        >
            <style>
            {
                '@keyframes pathAnim-0{0%,to{d:path("M 0,700 C 0,700 0,175 0,175 C 239,165.5 478,156 718,156 C 958,156 1199,165.5 1440,175 C 1440,175 1440,700 1440,700 Z")}25%{d:path("M 0,700 C 0,700 0,175 0,175 C 231.5,149.5 463,124 703,124 C 943,124 1191.5,149.5 1440,175 C 1440,175 1440,700 1440,700 Z")}50%{d:path("M 0,700 C 0,700 0,175 0,175 C 268.5,194.5 537,214 777,214 C 1017,214 1228.5,194.5 1440,175 C 1440,175 1440,700 1440,700 Z")}75%{d:path("M 0,700 C 0,700 0,175 0,175 C 186,197 372,219 612,219 C 852,219 1146,197 1440,175 C 1440,175 1440,700 1440,700 Z")}}@keyframes pathAnim-1{0%,to{d:path("M 0,700 C 0,700 0,350 0,350 C 175.5,328 351,306 591,306 C 831,306 1135.5,328 1440,350 C 1440,350 1440,700 1440,700 Z")}25%{d:path("M 0,700 C 0,700 0,350 0,350 C 242,372.5 484,395 724,395 C 964,395 1202,372.5 1440,350 C 1440,350 1440,700 1440,700 Z")}50%{d:path("M 0,700 C 0,700 0,350 0,350 C 271.5,348 543,346 783,346 C 1023,346 1231.5,348 1440,350 C 1440,350 1440,700 1440,700 Z")}75%{d:path("M 0,700 C 0,700 0,350 0,350 C 193,324 386,298 626,298 C 866,298 1153,324 1440,350 C 1440,350 1440,700 1440,700 Z")}}@keyframes pathAnim-2{0%,to{d:path("M 0,700 C 0,700 0,525 0,525 C 196.5,497 393,469 633,469 C 873,469 1156.5,497 1440,525 C 1440,525 1440,700 1440,700 Z")}25%{d:path("M 0,700 C 0,700 0,525 0,525 C 297,532 594,539 834,539 C 1074,539 1257,532 1440,525 C 1440,525 1440,700 1440,700 Z")}50%{d:path("M 0,700 C 0,700 0,525 0,525 C 193.5,552.5 387,580 627,580 C 867,580 1153.5,552.5 1440,525 C 1440,525 1440,700 1440,700 Z")}75%{d:path("M 0,700 C 0,700 0,525 0,525 C 187.5,536 375,547 615,547 C 855,547 1147.5,536 1440,525 C 1440,525 1440,700 1440,700 Z")}}'
            }
            </style>
            <path
            d="M0 700V175c239-9.5 478-19 718-19s481 9.5 722 19v525Z"
            strokeWidth={0}
            fill={colorOfWaves}
            fillOpacity={0.4}
            className="transition-all duration-300 ease-in-out delay-150"
            transform="rotate(-180 720 350)"
            style={{
                animation: "pathAnim-0 4s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
            }}
            />
            <path
            d="M0 700V350c175.5-22 351-44 591-44s544.5 22 849 44v350Z"
            strokeWidth={0}
            fill={colorOfWaves}
            fillOpacity={0.53}
            className="transition-all duration-300 ease-in-out delay-150"
            transform="rotate(-180 720 350)"
            style={{
                animation: "pathAnim-1 4s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
            }}
            />
            <path
            d="M0 700V525c196.5-28 393-56 633-56s523.5 28 807 56v175Z"
            strokeWidth={0}
            fill={colorOfWaves}
            className="transition-all duration-300 ease-in-out delay-150"
            transform="rotate(-180 720 350)"
            style={{
                animation: "pathAnim-2 4s",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
            }}
            />
        </svg>
        {statusIcon}
        <Text underline c='white' style={{
             position:'absolute',
             top:'20px',
             left:'20px',
        }} component={Link} to='/my-orders'>Back</Text>
        <Text ta={'center'}>Order succesful with ID : <b>{props.id}</b></Text>
    </div>
  )
}

export default Waves

