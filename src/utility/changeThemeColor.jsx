import { useTheme } from "next-themes";
import { useEffect } from "react";

function changeMenuTheme() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute('content', '#000000');
    } else {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute('content', '#ffffff');
    }
  }, [resolvedTheme]);
}

export default changeMenuTheme;
