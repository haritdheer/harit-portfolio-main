import React from "react";
import Particles from "react-tsparticles";
import particleConfig from "./config/particle_config";
import "tsparticles";

const ParticleBackground = () => {
  return <Particles id="tsparticles" options={particleConfig} />;
};

export default ParticleBackground;
