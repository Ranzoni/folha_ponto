import axios from 'axios'
import { config } from '../config'
import { AuthenticationRequest } from '../services/users/models/authentication.request'
import { AuthenticationResponse } from '../services/users/models/authentication.response'
import getValidationsFromError, { MessageValidationError } from '../errors/message-validation.error'
import { CreateUserRequest } from '../services/users/models/create-user.request'
import { UserResponse } from '../services/users/models/user.response'

const api = axios.create({
    baseURL: config.userApiBaseUrl,
})

export async function authenticateUser(authData: AuthenticationRequest): Promise<AuthenticationResponse | undefined> {
    try {
        const response = await api.post('/user/authenticate', authData, {
            headers: {
                'Chave-API': config.userApiKey
            }
        })

        const data: AuthenticationResponse = {
            user: {
                id: response.data.user.id,
                name: response.data.user.name,
                email: response.data.user.email
            },
            token: response.data.token
        }

        return data
    } catch (error: any) {
        handleError(error, `Não foi possível autenticar o usuário: ${error}`, `Erro ao autenticar usuário: ${error}`)
    }
}

export async function createUser(token: string, newUser: CreateUserRequest): Promise<UserResponse | undefined> {
  try {
    const response = await api.post('/user', newUser, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const user: UserResponse = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email
    }

    return user
  } catch (error) {
    handleError(error, `Não foi possível criar o usuário: ${error}`, `Erro ao criar o usuário: ${error}`)
  }
}

function handleError(error: any, responseError: string, notMappedError: string): never {
    if (error.response) {
        if (error.response.status === 422) {
            throw new MessageValidationError(getValidationsFromError(error.response.data))
        }

        if (error.response.status === 401) {
            const message = error.response.data[0].message
            if (!message) {
                throw new MessageValidationError(['Acesso negado'], 401)
            }

            throw new MessageValidationError(getValidationsFromError(error.response.data), 401)
        }

        throw new MessageValidationError([responseError], 400)
    }

    throw new MessageValidationError([notMappedError], 500)
}
