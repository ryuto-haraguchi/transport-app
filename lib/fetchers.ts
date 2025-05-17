export const fetcher = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(url, options);

  if (!res.ok) {
    // エラー情報を取得しようと試みる。JSON形式でなければstatusTextを使用。
    let errorInfo;
    try {
      errorInfo = await res.json();
    } catch (e) {
      errorInfo = { message: res.statusText };
    }

    const error = new Error(
      errorInfo.message || "An error occurred while fetching the data."
    ) as any;
    // エラーオブジェクトに追加情報を付与
    error.info = errorInfo;
    error.status = res.status;
    throw error;
  }

  return res.json();
};
