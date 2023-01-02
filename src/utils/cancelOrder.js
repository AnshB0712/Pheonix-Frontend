import customAxios from "../api/axios"

export const cancelOrder = async (orderId) => {
    console.log(orderId)
    const { data } = await customAxios.patch("/payment/paytm/change-status",{
        orderId,
        statusToBe: "FLD"
    })

    return data
}