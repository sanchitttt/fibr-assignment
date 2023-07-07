import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export function EmailIcon({ fill = '#A1A8B0' }: {
    fill?: string
}) {
    return <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
            stroke={fill}
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
            stroke={fill}
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
}

export function TickGreenIcon() {
    return <Image
        src='/TickGreen.svg'
        width={16}
        height={16}
        alt='Valid field'
    />
}

export function PasswordIcon({ fill = '#A1A8B0' }: {
    fill?: string
}) {
    return <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10"
            stroke={fill}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
            stroke={fill}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M15.9965 16H16.0054"
            stroke={fill}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M11.9955 16H12.0045"
            stroke={fill}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M7.99451 16H8.00349"
            stroke={fill}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
}

export function NameIcon({ fill = '#A1A8B0' }: {
    fill?: string
}) {
    return <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
            stroke={fill}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22"
            stroke={fill}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
}

export function EyeIcon() {
    return <svg className="SVGInline-svg" style={{ fill: 'black' }} width="16" height="11" viewBox="0 0 16 11" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M9.532 5.895c0 .825-.672 1.493-1.502 1.493S6.528 6.72 6.528 5.895c0-.824.673-1.492 1.502-1.492.83 0 1.502.668 1.502 1.492z"></path>
        <path fillRule="evenodd" clipRule="evenodd" d="M3.004 2.483A8.82 8.82 0 0 0 0 5.985a9.1 9.1 0 0 0 2.904 3.383 8.884 8.884 0 0 0 10.746-.386A8.783 8.783 0 0 0 16 5.985a8.843 8.843 0 0 0-3.184-3.592 9.053 9.053 0 0 0-9.812.09zm3.06.567a3.52 3.52 0 0 1 4.424.433 3.472 3.472 0 0 1 .436 4.397A3.5 3.5 0 0 1 9.35 9.163a3.525 3.525 0 0 1-3.819-.755 3.462 3.462 0 0 1-.76-3.795A3.487 3.487 0 0 1 6.063 3.05z"></path>
    </svg>
}

export function CancelIcon() {
    return <Image
        data-tooltip-id="Cancel" data-tooltip-content="Close"
        src='/CancelIcon.svg'
        width={16}
        height={16}
        alt='Cancel'
    />
}