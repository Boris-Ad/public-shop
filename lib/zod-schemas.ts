import { z } from 'zod';

const imageSchema = z
  .instanceof(File, { message: 'Обязательный параметр!' })
  .refine(file => file.size === 0 || file.type.startsWith('image/'), 'Обязательный параметр!');

export const addProductSchema = z.object({
  categoryId: z.string().min(1, { message: 'Укажите категорию!' }),
  name: z.string().min(1, { message: 'Обязательный параметр!' }).max(50, { message: 'Не больше 50ти символов!' }),
  number: z.coerce.number().nonnegative({ message: 'Число не должно быть меньше 0' }),
  price: z.coerce.number().positive({ message: 'Число не должно быть меньше 1' }),
  rootImage: imageSchema.refine(file => file.size > 0, 'Обязательный параметр!'),
  firstImage: imageSchema.optional(),
  secondImage: imageSchema.optional(),
});

export const updateProductSchema = addProductSchema.extend({
  rootImage: imageSchema.optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  name: z.string().min(1,{message:'Обязательно для заполнения!'}).max(50),
  email: z.string().email({message:'Обязательно для заполнения!'}),
  password: z.string().min(6,{message:'Минимум 6 символов'}).max(50),
});

export const addCategorySchema = z.object({
  category: z.string().min(1,{message:'Обязательно для заполнения!'})
})

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);
export const orderDataSchema = z.object({
  name: z.string().min(1, { message: 'Обязательный параметр!' }).max(50, { message: 'Не больше 50ти символов!' }),
  phone: z.string().regex(phoneRegex, 'Некорректный номер!'),
  email: z.string().refine(str => str.length === 0).or(z.string().email({message:'Некорректный email!'})),
  address: z.string().min(1, { message: 'Обязательный параметр!' }),
  description: z.string().max(1000, { message: 'Не больше 1000ти символов!' }),
});
