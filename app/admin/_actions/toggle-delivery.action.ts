'use server'

import { revalidatePath } from 'next/cache';
import prisma from "@/lib/db"

export const toggleDeliveryAction = async (id:string,delivered:boolean) => {
    await prisma.order.update({where:{id},data:{delivered}})

    revalidatePath('/admin/orders');
}