import SessionProvider from "./_components/providers/session";
import AntDProvider from "./_components/providers/theme";

function MainLayout() {
  return (
    <AntDProvider>
      <SessionProvider />
    </AntDProvider>
  );
}
export default MainLayout;
