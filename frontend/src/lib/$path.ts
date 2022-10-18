export const pagesPath = {
  otp: {
    complete: {
      $url: (url?: { hash?: string }) => ({ pathname: "/otp/complete" as const, hash: url?.hash }),
    },
    request: {
      $url: (url?: { hash?: string }) => ({ pathname: "/otp/request" as const, hash: url?.hash }),
    },
    $url: (url?: { hash?: string }) => ({ pathname: "/otp" as const, hash: url?.hash }),
  },
  $url: (url?: { hash?: string }) => ({ pathname: "/" as const, hash: url?.hash }),
};

export type PagesPath = typeof pagesPath;
