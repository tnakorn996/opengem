import { RiTicket2Line, RiTicketLine, RiTimer2Line } from "react-icons/ri"

export const appul = [
    // {
    //     contentid: `authmain`,
    //     contenttitle: `OPENGEM`,
    //     contentaction: `/auth/authmain/`,
    // },
    // {
    //     contentid: `authfrom`,
    //     contenttitle: `Welcome`,
    //     contentaction: `/auth/authform/`,
    // },
    // {
    //     contentid: `userform`,
    //     contenttitle: `User`,
    //     contentaction: `/user/userform/`,
    // },
    {
        contentid: `couponmain`,
        contenttitle: `Coupon`,
        contenticon: <RiTicket2Line />,
        contentaction: `/coupon/couponmain/`,
    },
    // {
    //     contentid: `couponform`,
    //     contenttitle: `Create coupo`,
    //     contentaction: `/coupon/couponform/`,
    // },
    {
        contentid: `claimain`,
        contenttitle: `Activity`,
        contenticon: <RiTimer2Line />,
        contentaction: `/claim/claimmain/`,
    },
]

export const settingul = [
    {
        contentid: `authfrom`,
        contenttitle: `Create account`,
        contentaction: `/auth/authform`,
    },
    {
        contentid: `userform`,
        contenttitle: `Account info`,
        contentaction: `/user/userform`,
    },
    {
        contentid: `couponform`,
        contenttitle: `Create coupon`,
        contentaction: `/coupon/couponform`,
    },
]

export const settingmainul = [
 
]


export const claimul = [
    {
        contentid: `claim`,
        contenttitle: `Claimed`,
    },
    // {
    //     contentid: `unclaim`,
    //     contenttitle: `Un-claim`,
    // },
 
]

export const checkul = [
    {
        contentid: `paid`,
        contenttitle: `Donated`,
    },
    // {
    //     contentid: `unpaid`,
    //     contenttitle: `Un-Paid`,
    // },
]

export const sortul = [
    {
        contentid: `new`,
        contenttitle: `Recently created`,
        contentbool: false,
    },
    {
        contentid: `old`,
        contenttitle: `Oldest`,
        contentbool: true,
    },
]