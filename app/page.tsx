import { Portfolio } from "./portfolio-client";
import profile from "../data/profile.json";
import github from "../data/github.json";

export default function Home() {
  return <Portfolio profile={profile} github={github} />;
}
