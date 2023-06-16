import { object, z } from 'zod'

type SignInDetails = {
    email: string,
    password: string
}

type SignUpDetails = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

type CreatePostDetails = {
    text_content: string,
    category_id: number,
    media_content: string,
}

function useSignInValidator(userDetails: SignInDetails) {

    let body;
    body = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    try {
        body.parse(userDetails)
        return {
            flag: true,
            ...body
        }
    }
    catch (err) {
        let zodAuthErrors = {
            flag: false,
            email: "",
            password: "",
        }
        if (err instanceof z.ZodError) {
            const issues = err.issues
            for (let i = 0; i < issues.length; i++) {
                const { path, message } = issues[i]
                zodAuthErrors[path[0] as keyof SignInDetails
                ] = message
            }
        }
        return zodAuthErrors
    }

}

function useSignUpValidator(userDetails: SignUpDetails) {

    let body;
    body = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(6),
        password_confirmation: z.string().min(6).and(z.string().refine((data) => data === userDetails.password, { message: "Passwords do not match" }))
    })

    try {
        body.parse(userDetails)
        return {
            flag: true,
            ...body
        }
    }
    catch (err) {
        let zodAuthErrors = {
            flag: false,
            email: "",
            password: "",
            name: "",
            password_confirmation: ""
        }
        if (err instanceof z.ZodError) {
            const issues = err.issues
            for (let i = 0; i < issues.length; i++) {
                const { path, message } = issues[i]
                zodAuthErrors[path[0] as keyof SignUpDetails
                ] = message
            }
        }
        return zodAuthErrors
    }

}

function useCreatePostValidator(postDetails: CreatePostDetails) {

    let body;
    body = z.object({
        text_content: z.string().min(3),
        category_id: z.number().min(1),
        media_content: z.string(),
    })

    try {
        body.parse(postDetails)
        return {
            flag: true,
            ...body
        }
    }
    catch (err) {
        let zodAuthErrors = {
            flag: false,
            text_content: "",
            category_id: "",
            media_content: "",
        }
        if (err instanceof z.ZodError) {
            const issues = err.issues
            for (let i = 0; i < issues.length; i++) {
                const { path, message } = issues[i]
                zodAuthErrors[path[0] as keyof CreatePostDetails
                ] = message
            }
        }
        return zodAuthErrors
    }

}

export { useSignInValidator, useSignUpValidator, useCreatePostValidator }