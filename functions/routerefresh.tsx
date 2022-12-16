import { useRouter } from 'next/router';



    const router = useRouter();

  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  }


  export default refreshData;

