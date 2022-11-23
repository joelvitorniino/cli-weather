import axios from "axios";
import { Arguments, CommandBuilder } from "yargs";

type Options = {
    name: string;
    city: string;
};

interface IWttr {
    current_condition: [
        {
            FeelsLikeC: string;
            humidity: string;
            lang_pt: [
                {
                    value: string;
                }
            ],

            temp_C: string;
        }
    ]
}

export const command: string = "city <name>";
export const desc: string = `Search weather forecast <name> of city!`;

export const builder: CommandBuilder<Options, Options> = (yargs) => {
    return yargs
        .options({
            city: { type: 'string' }
        })
        .positional("name", { type: "string", demandOption: true });
};

export const handler = async (argv: Arguments<Options>): Promise<void> => {
    const { name, city} = argv;
    
    if(city) {
        const { data } = await axios.get<IWttr>(`https://wttr.in/${name}?format=j1&lang=pt`);

        process.stdout.write(`Temperatura: ${data.current_condition[0].temp_C}\n\nSensação Térmica: ${data.current_condition[0].FeelsLikeC}`);
    };
  
    process.exit(0);
  };