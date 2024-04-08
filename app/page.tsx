"use client";
import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import Snackbar from "@mui/material/Snackbar";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Tabs } from "./components/tabs";
import React from "react";
import {
    FaYoutube,
    FaPlay,
    FaPause,
    FaSun,
    FaMusic,
    FaTwitter,
    FaChartPie,
} from "react-icons/fa";
import HatekinImage from "/assets/NTJJP.png";

export default function Home() {
    let [snackOpen, setSnackOpen] = React.useState<any>(true);
    let [MessageSent, setMessageSent] = React.useState<any>(false);
    const [message, setMessage] = React.useState<string>("");
    const [isSending, setIsSending] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(true);
    const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
    const [claim, setClaim] = React.useState<HTMLAudioElement | null>(null);
  
    React.useEffect(() => {
      setAudio(new Audio("/rap.mp3"));
      setClaim(new Audio("/claim.mp3"));
    }, []);
    
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

    const actions = [
      { icon: <FaPlay />, name: "再生", onClick: () => audio && audio.play()},
      { icon: <FaPause />, name: "停止", onClick: () => audio && audio.pause()},
    ];

    const links = [
        {
            icon: <FaTwitter />,
            name: "設x（旧シコッター）で HATE SPEACH を拡散する",
            href: "https://twitter.com/intent/tweet?text=%E8%A1%A8%E7%8F%BE%E3%81%AE%E8%87%AA%E7%94%B1.JP%E3%81%A7%E3%81%82%E3%81%AA%E3%81%9F%E3%82%82%E8%A1%A8%E7%8F%BE%E3%81%AE%E8%87%AA%E7%94%B1%E3%82%92%E6%8E%92%E9%99%A4%E3%82%84%E3%81%81%E3%82%8A%E3%81%BE%E3%81%97%E3%82%87%E3%81%86%EF%BC%81&url=https://%E8%A1%A8%E7%8F%BE%E3%81%AE%E8%87%AA%E7%94%B1.jp/",
        },
        {
            icon: <FaYoutube />,
            name: "BGM元ネタ",
            href: "https://www.youtube.com/watch?v=lkosQ93S4Ok",
        },
        {
          icon: <FaChartPie />,
          name: "統計の自由",
          href: "https://analytics.mikandev.tech/share/1Fntx3LtWlTyd0tC/Hatekin",
      },
    ];

    const HatekinTab = () => {
        return (
            <Image
                src={HatekinImage.src}
                alt="HATEKIN"
                width="1640"
                height="921"
                className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
            />
        );
    };

    const EggTab = () => {
        return (
            <iframe
                src="https://iframe.mediadelivery.net/embed/31796/9ee1d977-1e59-490c-ae46-3dca3f8e3ce1?loop=true&muted=false&autoplay=false&preload=true&responsive=false"
                loading="lazy"
                className="object-cover object-left-top h-[60%]  mb-12 md:h-[80%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
            ></iframe>
        );
    };

    const FormTab = () => {
        const handleSubmit = async (event: { preventDefault: () => void }) => {
            event.preventDefault();

            setIsSending(true);

            const sendMessageRes = await fetch("/api/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message }),
            });

            if (!sendMessageRes.ok) {
                console.error("Failed to send message");
            }

            setMessageSent(true);
            setTimeout(() => setIsSending(false), 5000);

            setMessage("");
        };

        return (
            <form
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
                className="mt-10"
            >
                <TextField
                  label="あの別にクレームとかじゃないですからね？普通に質問するだけです"
                  multiline
                  rows={15}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  variant="outlined"
                  fullWidth
                  style={{ marginBottom: "1rem" }}
                  onClick={() => claim && claim.play()}
                />
                <Button variant="contained" color="primary" type="submit" disabled={isSending}>
                    クレーム送信
                </Button>
            </form>
        );
    };

    const tabs = [
        {
            title: "ホームページ",
            value: "homepage",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
                    <p>表現の自由.JP</p>
                    <HatekinTab />
                </div>
            ),
        },
        {
            title: "🥚",
            value: "egg",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-yellow-700 to-violet-900">
                    <p>許して...</p>
                    <EggTab />
                </div>
            ),
        },
        {
            title: "問い合わせフォーム",
            value: "form",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-red-700 to-red-900">
                    <p>問い合わせフォーム</p>
                    <FormTab />
                </div>
            ),
        },
    ];

    return (
        <div className="h-[10rem] md:h-[40rem] [perspective:1200px] w-full relative b flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-10 overflow-hidden">
            <Tabs tabs={tabs} />
            <Snackbar
                open={snackOpen}
                autoHideDuration={5000}
                onClose={() => setSnackOpen(false)}
                message="表現の自由の自由.JPが更新されたなぁ、そうに決まってる"
            />
            <Snackbar
                open={MessageSent}
                autoHideDuration={5000}
                onClose={() => setSnackOpen(false)}
                message="クレームが送信されました！"
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: 20,
                    right: 16,
                    transform: "translateZ(0px)",
                    flexGrow: 1,
                }}
            >
                <SpeedDial ariaLabel="PlayMenu" icon={<FaMusic />}>
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={action.onClick}
                        />
                    ))}
                </SpeedDial>
            </Box>
            <Box
                sx={{
                    position: "absolute",
                    bottom: 20,
                    right: 86,
                    transform: "translateZ(0px)",
                    flexGrow: 1,
                }}
            >
                <SpeedDial ariaLabel="PlaMenu" icon={<FaSun />}>
                  {links.map((action) => (
                    <SpeedDialAction
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                      onClick={() => window.location.href=action.href}
                    />
                  ))}
                </SpeedDial>
            </Box>
            <Dialog open={dialogOpen} onClose={handleNo}>
                <DialogTitle>
                    ページBGM、ありますか～？
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleYes}>ありまーす！</Button>
                    <Button onClick={handleNo}>絶対にありません。</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
