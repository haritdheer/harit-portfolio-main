import React from "react";
import ProfileLayout from "../../layouts/profile";
import Homepage from "../../components/home_page";
import { AnimationOnScroll } from "react-animation-on-scroll";

const HomePage = () => {
  return (
    <ProfileLayout>
      <AnimationOnScroll animateIn="animate__fadeInDownBig">
        <Homepage />
      </AnimationOnScroll>
    </ProfileLayout>
  );
};

export default HomePage;
