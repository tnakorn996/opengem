import { RiTicket2Line, RiTicketLine } from "react-icons/ri"

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
    // {
    //     contentid: `claimain`,
    //     contenttitle: `Status`,
    //     contentaction: `/claim/claimmain/`,
    // },
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
        contenttitle: `Claim`,
    },
    {
        contentid: `unclaim`,
        contenttitle: `Un-claim`,
    },
 
]

export const contributeul = [
    {
        contentid: `paid`,
        contenttitle: `Paid`,
    },
    {
        contentid: `unpaid`,
        contenttitle: `Un-Paid`,
    },
 
]