"use client"

import { CircularProgressbar } from "react-circular-progressbar"

export const Chart = ({ score, values }) => {

    return (
        <CircularProgressbar 
            value={score} 
            text={`${score}%`} 
            styles={{
                path: {
                    transform: 'rotate(0.28turn)',
                    transformOrigin: 'center center',
                    stroke: `rgba(${values?.pathStroke}, ${score / 100})`,
                    strokeLinecap: 'round',
                },
                trail: {
                    stroke: `${values?.trailStroke}`,
                },
                background: {
                    fill: `${values?.pathStroke}`
                },
                text: {
                    fill: `${values?.pathStroke}`,
                    fontSize: `${values?.fontSize}`,
                    fontWeight: `${values?.fontWeight}`,
                    textAnchor: 'middle',
                    dominantBaseline: 'middle'
                }
            }}
        /> 
    )
}