"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import HatekinImage from "/assets/NTJJP.png";
import { GiJapan } from "react-icons/gi";
import { FaPlay, FaStop, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Loading from "./components/spinner-mask";
import { CardBody, CardContainer, CardItem } from "./components/3d-card";

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    useToast,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    Link,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Textarea,
} from "@chakra-ui/react";

export default function Home() {
    const [snackOpen, setSnackOpen] = React.useState<any>(true);
    const [MessageSent, setMessageSent] = React.useState<any>(false);
    const [message, setMessage] = React.useState<string>("");
    const [isSending, setIsSending] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [formOpen, setFormOpen] = React.useState<boolean>(false);
    const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
    const [claim, setClaim] = React.useState<HTMLAudioElement | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const router = useRouter();
    const toast = useToast();

    const updateToast = () => {
        toast({
            title: "アップデート完了！",
            description:
                "「ホームページが質素な気がします」という指摘が来たので、今本格的に開發しました。",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    React.useEffect(() => {
        const audio = new Audio("/rap.mp3");
        audio.loop = true;
        setAudio(audio);
        setClaim(new Audio("/claim.mp3"));
        updateToast();
    }, []);

    const openForm = () => {
        claim?.play();
        setFormOpen(true);
    };

    const sendMsg = async () => {
        setFormOpen(false);
        if (message.length < 1) {
            toast({
                title: "クレームを入力してください。",
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
                    title: "新しいクレームです！",
                    fields: [
                        {
                            name: "クレーム内容",
                            value: message,
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

        const res = await fetch(
            "https://discord.com/api/webhooks/1178223549769601035/iza0JRPhU646LNQz8IGTvp22aHaSSxggnHHHpCiaWk6WFP_7kfpPxErcObSELo0fuGhK",
            {
                method: "POST",
                body: formData,
            },
        );
        setIsSending(false);
        if (res.ok) {
            setMessage("");
            setMessageSent(true);
            toast({
                title: "クレームを送信されました！",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } else {
            toast({
                title: "クレームの送信に失敗しました。",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleYes = () => {
        if (audio) {
            audio.play();
        }
        setDialogOpen(false);
    };

    const handleNo = () => {
        setDialogOpen(false);
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

    if (isSending) {
        return <Loading />;
    }

    return (
        <main>
            <Modal
                isCentered
                onClose={() => setFormOpen(false)}
                isOpen={formOpen}
                motionPreset="slideInBottom"
                size={"xl"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        はーいこちらの問い合わせフォームに電話します。
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p className="mb-5">
                            あの別にクレームとかじゃないですからね？普通に質問をするだけです。
                        </p>
                        <Textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="あ、おい"
                            size="lg"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => sendMsg()}
                        >
                            クレーム送信
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => setFormOpen(false)}
                        >
                            やめる
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <AlertDialog
                motionPreset="slideInBottom"
                //@ts-ignore
                leastDestructiveRef={cancelRef}
                onClose={handleNo}
                isOpen={dialogOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>質問だ、ありがたい。</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>ページBGM、ありますか～？</AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={handleNo}>絶対にありません。</Button>
                        <Button colorScheme="red" ml={3} onClick={handleYes}>
                            ありまーす！！
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
                className="fixed z-50 bottom-10 left-10 py-5 px-2 border-2 bg-green-300 rounded-full cursor-pointer"
                onClick={onOpen}
            >
                <GiJapan size={30} />
            </div>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                size={"xl"}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>表現の自由.JP</DrawerHeader>

                    <DrawerBody>
                        <p className="mb-1">v4.0.5</p>
                        <p className="mb-5">
                            開發時間の無駄遣いだなぁ、そうに決まってる
                        </p>
                        <Flex direction={"column"}>
                            <Link className="mt-1" onClick={() => openForm()}>
                                問い合わせフォーム
                            </Link>
                            <Link
                                className="mt-1"
                                onClick={() => router.push("/original.html")}
                            >
                                本家（復元）
                            </Link>
                            <Link
                                className="mt-1"
                                onClick={() =>
                                    router.push(
                                        "https://analytics.mikandev.tech/share/srulAzJjmxOLlAj5/xn--u9j474rm0ah55am1h.jp",
                                    )
                                }
                            >
                                統計の自由
                            </Link>
                            <Link
                                className="mt-1"
                                onClick={() => router.push("/moukon")}
                            >
                                毛根な時間！？bot
                            </Link>
                        </Flex>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button
                            className="mr-3"
                            colorScheme="purple"
                            leftIcon={<FaTwitter />}
                            onClick={() =>
                                router.push(
                                    "https://twitter.com/intent/tweet?text=%E8%A1%A8%E7%8F%BE%E3%81%AE%E8%87%AA%E7%94%B1.JP%E3%81%A7%E3%81%82%E3%81%AA%E3%81%9F%E3%82%82%E8%A1%A8%E7%8F%BE%E3%81%AE%E8%87%AA%E7%94%B1%E3%82%92%E6%8E%92%E9%99%A4%E3%82%84%E3%81%81%E3%82%8A%E3%81%BE%E3%81%97%E3%82%87%E3%81%86%EF%BC%81&url=https://%E8%A1%A8%E7%8F%BE%E3%81%AE%E8%87%AA%E7%94%B1.jp/",
                                )
                            }
                        >
                            設x（旧シコッター）でHATE SPEACHを拡散する
                        </Button>
                        <Button
                            className="mr-3"
                            colorScheme="blue"
                            leftIcon={<FaStop />}
                            onClick={() => audio?.pause()}
                        >
                            停止
                        </Button>
                        <Button
                            colorScheme="red"
                            leftIcon={<FaPlay />}
                            onClick={() => audio?.play()}
                        >
                            再生
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col gap-4 items-center justify-center px-4 mt-10"
                onAnimationComplete={() => setDialogOpen(true)}
            >
                <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                    表現の自由.JP
                </div>
            </motion.div>
            <CardContainer className="inter-var">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                    <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                        ブンブンハローYahoo!ニュースのコメント欄
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                        どうもヘイトキンです。
                    </CardItem>
                    <CardItem
                        translateZ="100"
                        rotateX={20}
                        rotateZ={-10}
                        className="w-full mt-4"
                    >
                        <Image
                            src={HatekinImage.src}
                            height="1000"
                            width="1000"
                            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                        />
                    </CardItem>
                    <div className="flex justify-between items-center mt-20">
                        <CardItem
                            translateZ={20}
                            translateX={40}
                            as="button"
                            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
                            onClick={onOpen}
                        >
                            メインメニュー
                        </CardItem>
                    </div>
                </CardBody>
            </CardContainer>
            <div className="text-2xl md:text-2xl font-bold dark:text-white text-center animate-bounce">
                開發時間の無駄遣いだなぁ、そうに決まってる
            </div>
        </main>
    );
}
