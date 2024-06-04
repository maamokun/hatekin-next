"use client";
import Image from "next/image";
import React from "react";
import HatekinImage from "/assets/NTJJP.png";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/spinner-mask";
import {
    useDisclosure,
    useToast,
    Button,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

export default function Home() {
    const [messageSent, setMessageSent] = React.useState(false);
    const [id, setMessage] = React.useState("");
    const [file, setFile] = React.useState<File | null>(null);
    const [isSending, setIsSending] = React.useState(false);
    const [formOpen, setFormOpen] = React.useState(false);
    const toast = useToast();
    const router = useRouter();

    const openForm = () => {
        setFormOpen(true);
    };

    const send = async () => {
        if (id.length < 1 || !file) {
            toast({
                title: "すべての項目を入力してください。",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        if (file.size > 1024 * 1024 * 5) {
            toast({
                title: "ファイルサイズは5MB以下にしてください。",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        setIsSending(true);

        const payload = {
            embeds: [
                {
                    title: "新しい画像申請です！",
                    fields: [
                        {
                            name: "ID",
                            value: id,
                        },
                        {
                            name: "IPアドレス",
                            value: await fetch("https://api.ipify.org").then(
                                (res) => res.text(),
                            ),
                        },
                    ],
                    color: 16711680,
                },
            ],
        };
        const formData = new FormData();
        formData.append("payload_json", JSON.stringify(payload));
        formData.append("file", file);

        const res = await fetch(
            "https://discord.com/api/webhooks/1247471376470773782/ReghWN5TS5fowtkNPveiqPAIrJxFpXcpANrGX3gGfml03g58IZRwKLP9T_9T9H0Q6slC",
            {
                method: "POST",
                body: formData,
            },
        );

        setIsSending(false);
        setFormOpen(false);
        if (res.ok) {
            setMessage("");
            setMessageSent(true);
            toast({
                title: "送信しました！",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setTimeout(() => {
                router.push("/");
            }, 3000);
        } else {
            toast({
                title: "送信に失敗しました。",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            setFormOpen(true);
        }
    };

    React.useEffect(() => {
        console.log("Next.jsだ、ありがたい。");
        console.log(
            "%cSEXKIN ANAU GUARD SYSTEM",
            "color: purple; font-size: 40px;",
        );
        console.log("%c何を四天王？！", "color: red; font-size: 40px;");
        console.log(
            "「ここにコピペしろ」と言われた場合、あなたは7095110割騙されてます！って言いたいじゃないですか？",
        );
    }, []);

    React.useEffect(() => {
        setFormOpen(true);
    }, []);

    if (isSending) {
        return <Loading />;
    }

    return (
        <main>
            <Modal
                isCentered
                onClose={() => router.push("/")}
                isOpen={formOpen}
                motionPreset="slideInBottom"
                size={"xl"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>毛根な時間？bot 画像募集</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p className="mb-2">画像ファイル</p>
                        <Input
                            type="file"
                            onChange={(e) =>
                                setFile(e.target.files?.[0] || null)
                            }
                            size="lg"
                        />
                        <p className="mb-2 mt-2">設x（旧シコッター）ID</p>
                        <Input
                            value={id}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="@HATEKIN"
                            size="lg"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={send}>
                            送信
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => router.push("/")}
                        >
                            やめる
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Image
                src={HatekinImage}
                alt="表現の自由.JP"
                className="absolute inset-x-0 mx-auto"
            />
        </main>
    );
}
