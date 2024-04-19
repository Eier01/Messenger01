"use client";
import { User } from "@prisma/client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { HiPhoto } from "react-icons/hi2";
import Button from "../Button";
import Input from "../inputs/Input";
import Modal from "../Modal";

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser: User;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    currentUser,
}) => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image,
        },
    });

    const image = watch("image");

    const handleUpload = (result: any) => {
        setValue("image", result?.info?.secure_url, {
            shouldValidate: true,
        });
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setisLoading(true);

        axios
            .post("/api/settings", data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error("Algo salio mal"))
            .finally(() => setisLoading(false));
    };

    

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-10">
                        <h2
                            className="
                            text-base
                            font-semibold
                            leading-7
                            text-gray-900
                        "
                        >
                            Perfil
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Edita tu informacion publica
                        </p>
                        <div
                            className="
                            mt-10
                            flex
                            flex-col
                            gap-y-8
                        "
                        >
                            <Input
                                disabled={isLoading}
                                label="nombre"
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />
                            <div
                                className="
                                block
                                text-sm
                                font-medium
                                leading-6
                                text-gray-900
                            "
                            >
                                <label>Foto</label>
                                <div
                                    className="
                                    mt-2
                                    flex
                                    items-center
                                    gap-x-3
                                "
                                >
                                    <Image
                                        width="48"
                                        height="48"
                                        className="rounded-full"
                                        src={
                                            image ||
                                            currentUser?.image ||
                                            "/images/user.jpg"
                                        }
                                        alt="Avatar"
                                    />
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset="oubgimea"
                                    >
                                        <Button
                                            disabled={isLoading}
                                            secondary
                                            type="button"
                                        >
                                            Cambiar
                                            <HiPhoto
                                            size={25}
                                            className="text-sky-500"
                                        />
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="
                    mt-6
                    flex
                    items-center
                    justify-end
                    gap-x-6
                ">
                    <Button
                        disabled={isLoading}
                        secondary
                        onClick={onClose}
                        type="button"
                    >
                        Cancelar
                    </Button>
                    <Button
                        disabled={isLoading}
                        type="submit"
                    >
                        Guardar
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default SettingsModal;
