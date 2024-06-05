
export interface UISlice {
    navbarOpen : boolean;
    setNavbarOpen : (navbarOpen : boolean) => void
}

export const createUIslice = ( set:any ) : UISlice=> ({
 navbarOpen : false,
 setNavbarOpen : (navbarOpen) => set({navbarOpen})

})