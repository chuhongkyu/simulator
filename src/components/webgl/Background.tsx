const Background = ({color = "#c2f1d5"}:{color?: string}) => {
  return (
    <>
      <color attach="background" args={[color]} />
      <fog attach="fog" args={[color, 1, 1000]}/>
    </>
  );
};

export default Background;