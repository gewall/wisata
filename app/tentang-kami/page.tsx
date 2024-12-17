import React from "react";
import PageLayout from "../_components/PageLayout";

type Props = {};

const page = (props: Props) => {
  return (
    <PageLayout>
      <div className="container p-8">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Tentang Kami
        </h3>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nulla
          neque, congue ac finibus interdum, tempus eu augue. Proin fringilla,
          lorem sed venenatis vehicula, elit massa gravida magna, et efficitur
          ante ipsum vel purus. Integer nec rhoncus felis. Curabitur eu
          fermentum elit, in fermentum ex. Donec nec ligula sit amet elit
          dapibus consequat. Fusce sem augue, mattis hendrerit ex et, porttitor
          dapibus sapien. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Donec nunc magna, bibendum eu justo
          sed, vestibulum varius neque. Maecenas posuere, eros sit amet sodales
          pharetra, magna est tempor arcu, nec ullamcorper augue metus a magna.
          Vestibulum sollicitudin ante nibh, et efficitur mauris interdum non.
          Suspendisse quis mauris id arcu vehicula vulputate. Morbi ornare id
          metus vitae dignissim. Suspendisse varius, sem eu vulputate
          ullamcorper, mi orci feugiat ligula, vitae commodo lacus tortor ac
          nisi. Nam semper est eget fringilla sollicitudin. Nunc accumsan
          imperdiet elit, dignissim dignissim dui pellentesque molestie. Donec
          urna dolor, lacinia at erat in, consequat varius tellus.
        </p>
      </div>
    </PageLayout>
  );
};

export default page;
