import { Divider } from "@heroui/react";
import { Train } from "lucide-react";

export default function ReachSiwan() {
  return (
    <section className="min-h-[100dvh] max-w-[1440px] px-[5%] m-auto">
      <div className="py-4 ">
        <h1 className="text-sky-400 text-xl ">HOW TO REACH GEC SIWAN ?</h1>
        <Divider />
      </div>

      {/* Description     */}
      <p>
        Government Engineering College, Siwan, is one of the emerging centers of
        technical education in Bihar, steadily gaining recognition for its
        academic excellence and commitment to innovation. Located in the western
        part of the state, this institution plays a crucial role in nurturing
        skilled engineers and technocrats for the future. Situated in Siwan
        district, the college benefits from a developing network of road and
        rail connectivity, linking it effectively with major cities in Bihar and
        neighboring states.
      </p>
      <br />
      <strong>Reaching GEC Siwan</strong>
      <br />
      <br />

      <ol>
        <li>
          <b>1. By AIR :</b> The nearest major airport is Jay Prakash Narayan
          International Airport, Patna, located about 119 km from the college
          campus by road. From the airport, you can hire a taxi or catch a
          state-run bus toward Siwan city and then a local taxi or bus to
          Bawandih, Chainpur. Alternative air hubs serving this region include
          Kushinagar Airport (≈ 95 km from Siwan city) and Gorakhpur Airport (≈
          100 km from Siwan city), both offering limited domestic services; from
          there you&apos;d proceed by road to the college
        </li>
        <li>
          <b>2. By Train :</b> The closest railhead is Siwan Junction (station
          code: SV), which lies in Siwan city and connects to Delhi, Kolkata,
          Mumbai and other major metros via express and passenger trains. .
          Government Polytechnic (where GEC Siwan is located) is approximately
          27.1 km from Siwan Junction by road; taxis, shared jeeps and state
          buses ply this route frequently
        </li>
        <li>
          <b>3. By Road :</b> National Highway 531 (NH 531) links Siwan to
          Gopalganj and Chhapra, and meets NH 27 at Gopalganj for onward travel
          across northern India. Bihar State Highway 47 (SH 47)
          connects Barharia, Mairwa and Guthani to Siwan city; from Siwan you
          take local roads to Bawandih, Chainpur (≈ 30 km). Regular
          state-run and private buses, as well as hired cabs and shared autos,
          operate between Siwan city and nearby villages (including Chainpur),
          making the last‐mile commute straightforward.
        </li>
      </ol>
    </section>
  );
}
