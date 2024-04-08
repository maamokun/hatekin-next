export default async function handler(
    req: {
        headers: any;
        socket: any;
        body: { message: any; ip: any };
    },
    res: {
        status: (arg0: number) => {
            (): any;
            new (): any;
            json: { (arg0: { status: number }): void; new (): any };
        };
    },
) {
    const { message } = req.body;
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const webhookURL =
        "https://discord.com/api/webhooks/1178223549769601035/iza0JRPhU646LNQz8IGTvp22aHaSSxggnHHHpCiaWk6WFP_7kfpPxErcObSELo0fuGhK"; // Replace with your webhook URL

    const data = {
        embeds: [
            {
                title: "新しいクレームです！",
                fields: [
                    { name: "クレーム内容", value: message },
                    { name: "IPアドレス", value: ip },
                ],
            },
        ],
    };

    const discordRes = await fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    res.status(discordRes.status).json({ status: discordRes.status });
}
