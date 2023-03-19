import { Link, useLoaderData } from "@remix-run/react"
import { useState } from "react"

const filters = [
    {
        label: 'All',
        value: 'all'
    },{
        label: 'Completed',
        value: 'completed'
    },{
        label: 'Incompleted',
        value: 'incompleted'
    }
]

export const TodoFilter = () => {
    const data = useLoaderData()
    let {filter} = data
    if(!filter) {
        filter = 'all'
    }
    return <div className="flex text-sm_action mt-[40px]">
        <p className="text-dark-blue-grey opacity-60 mr-[17px]">Show:</p>
        {filters.map(({label, value}) => {
            return <Link
                key={'todofilter' + value} to={`?filter=${value}`}><p
                className={`${filter === value ? '': 'underline text-dark-sky-blue cursor-pointer'} mr-[10px]`}>
                {label}
            </p></Link>
        })}
    </div>
}