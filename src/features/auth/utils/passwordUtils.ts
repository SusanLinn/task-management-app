import type {
    LocalCredential,
} from "@/types/auth";


const PASSWORD_ITERATIONS =
    100_000;


const bytesToBase64 =
    (
        bytes:
            Uint8Array
    ) => {

        let binary =
            "";


        for (
            const byte
            of bytes
        ) {
            binary +=
                String.fromCharCode(
                    byte
                );
        }


        return btoa(
            binary
        );
    };


const base64ToBytes =
    (
        value:
            string
    ) => {

        const binary =
            atob(
                value
            );


        return Uint8Array.from(
            binary,
            (
                character
            ) =>
                character
                    .charCodeAt(
                        0
                    )
        );
    };

//core hashing engine
const derivePasswordHash =
    async (
        password:
            string,

        passwordSalt:
            string,

        iterations:
            number
    ) => {

        //Web Crypto API ရှိလားစစ်တာ
        if (
            !globalThis.crypto
                ?.subtle
        ) {
            throw new Error(
                "PASSWORD_CRYPTO_UNAVAILABLE"
            );
        }

        //Password string ကို bytes ပြောင်းတာ
        const encoder =
            new TextEncoder();


        const passwordKey =
            await crypto.subtle
                //password ကို crypto key အဖြစ်ပြောင်းတာ
                .importKey(
                    "raw",
                    encoder.encode(
                        password
                    ),
                    {
                        name:
                            "PBKDF2",
                    },
                    false,
                    [
                        "deriveBits",
                    ]
                );

        //actual PBKDF2 hashing
        const derivedBits =
            await crypto.subtle
                .deriveBits(
                    {
                        name:
                            "PBKDF2",

                        salt:
                            base64ToBytes(
                                passwordSalt
                            ),

                        iterations,

                        hash:
                            "SHA-256",
                    },
                    passwordKey,
                    256
                );


        return bytesToBase64(
            new Uint8Array(
                derivedBits
            )
        );
    };


export const createPasswordHash =
    async (
        password:
            string
    ) => {

        //Salt generation
        const saltBytes =
            crypto
                .getRandomValues(
                    new Uint8Array(
                        16
                    )
                );


        const passwordSalt =
            bytesToBase64(
                saltBytes
            );


        const passwordHash =
            await derivePasswordHash(
                password,
                passwordSalt,
                PASSWORD_ITERATIONS
            );


        return {
            passwordHash,
            passwordSalt,
            iterations:
                PASSWORD_ITERATIONS,
        };
    };


export const verifyPassword =
    async (
        password:
            string,

        credential:
            LocalCredential
    ) => {

        //User အခုရိုက်လိုက်တဲ့ password မှန်တယ်ဆိုရင် ဖြစ်လာသင့်တဲ့ hash
        const candidateHash =
            await derivePasswordHash(
                password,
                credential
                    .passwordSalt,
                credential
                    .iterations
            );


        const candidateBytes =
            base64ToBytes(
                candidateHash
            );


        const storedBytes =
            base64ToBytes(
                credential
                    .passwordHash
            );


        if (
            candidateBytes.length !==
            storedBytes.length
        ) {
            return false;
        }


        //Hash comparison
        let difference =
            0;


        for (
            let index = 0;
            index <
            candidateBytes.length;
            index++
        ) {

            difference |=
                candidateBytes[
                    index
                ] ^
                storedBytes[
                    index
                ];
        }


        return difference ===
            0;
    };