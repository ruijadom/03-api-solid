import { expect, test, describe } from 'vitest'
import { RegisterUseCase } from './register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { compare } from 'bcryptjs'

describe('Register use case', () => {
  test('should hash user password upon registration', async () => {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    const { user }  = await registerUseCase.execute({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '123456',
    })

    // Check if the password is correctly hashed
    const isPasswordCorrectlyHashed = await compare('123456', user.password_hash)
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})