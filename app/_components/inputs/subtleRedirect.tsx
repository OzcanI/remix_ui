import { Link } from "@remix-run/react"

export const SubtleRedirect = ({text, url}: {text: string, url: string}) => {
    return <Link to={url}>
        <p className="text-sm_action mt-[22px] underline text-dark-blue-grey">{text}</p>
    </Link>
}