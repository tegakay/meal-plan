// components/Footer.tsx
const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; {new Date().getFullYear()} Meal Prep. All rights reserved.</p>
          <p className="mt-2">
            Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  