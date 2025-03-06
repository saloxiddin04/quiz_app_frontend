import React, {useState} from "react";
import {TbClipboardList, TbLetterQ} from "react-icons/tb";
import {NavLink, useLocation} from "react-router-dom";
import {getUserData} from "../auth/jwtService";
import {FaBook, FaUserAlt} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {AiFillPlusSquare, AiOutlineDown, AiOutlineUp} from "react-icons/ai";
import {toggleSidebar} from "../redux/LocalStorageSlice/LocalStorageSlice.js";

const Sidebar = () => {
	const dispatch = useDispatch()
	const {isSidebarOpen} = useSelector((state) => state.localStorage)
	
	const { pathname } = useLocation();
	
	// Track open/close state for parent menus with children
	const [openMenus, setOpenMenus] = useState({});
	
	const adminMenu = [
		{
			title: "Test",
			icon: <TbClipboardList className="mt-1" size="20" />,
			children: [
				{ title: 'Tests', path: "/tests", icon: <TbLetterQ className="mt-1" size="20"/> },
				{ title: 'Create Test', path: "/create-test/:id", icon: <AiFillPlusSquare className="mt-1" size="20"/> },
			]
		},
	]
	
	const handleCleanCurrentPage = () => {
		localStorage.removeItem('currentPage')
		localStorage.removeItem('ModuleTest')
		localStorage.removeItem('searchTestState')
	}
	
	const toggleMenu = (title) => {
		setOpenMenus((prevState) => ({
			...prevState,
			[title]: !prevState[title],
		}));
	};
	
	const isParentActive = (children) =>
		children?.some((child) => pathname.startsWith(child.path));
	
	return (
		<div className="relative">
			<div
				className={`${
					isSidebarOpen ? 'block sm:block md:block lg:hidden' : 'hidden'
				} fixed top-14 sm:top-14 md:top-[58px] lg:top-16 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 z-50`}
				onClick={() => dispatch(toggleSidebar())}
			></div>
			<div
				className={`fixed top-14 sm:top-14 md:top-[58px] lg:top-16 bg-white text-gray-700 h-screen w-56 z-50 py-8 ${
					isSidebarOpen ? "" : "hidden"
				}`}
			>
				{getUserData()?.role === 'admin' ? (
					<>
						<nav>
							<ul>
								{adminMenu.map((menu) => (
									<li key={menu.title}>
										<button
											onClick={() => toggleMenu(menu.title)}
											className={`flex items-center justify-between gap-5 py-2.5 px-4 first:mt-0 my-2 w-full rounded-r transition duration-200 hover:bg-primary/10 ${
												isParentActive(menu.children) ? "bg-primary/20" : ""
											}`}
										>
											<div className="flex items-center gap-5">
												{menu.icon}
												<span>{menu.title}</span>
											</div>
											{openMenus[menu.title] ? <AiOutlineUp/> : <AiOutlineDown/>}
										</button>
										
										{openMenus[menu.title] && (
											<ul className="pl-6">
												{menu.children.map((child) => (
													<li key={child.title}>
														<NavLink
															to={child.path}
															activeclassname="active"
															className="flex w-full items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
														>
															{child.icon}
															<span>{child.title}</span>
														</NavLink>
													</li>
												))}
											</ul>
										)}
									</li>
								))}

								<NavLink
									activeclassname="active"
									to={"/main"}
									className="flex w-full items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
								>
									<TbLetterQ className="mt-1" size="20"/>
									<span>Main</span>
								</NavLink>
								
								{/* Independent Links */}
								<NavLink
									onClick={handleCleanCurrentPage}
									activeclassname="active"
									to={"/users"}
									className="flex w-full items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
								>
									<FaUserAlt size="22" className="mt-1"/>
									<span>Users</span>
								</NavLink>

								<NavLink
									onClick={handleCleanCurrentPage}
									activeclassname="active"
									to={"/create-subject"}
									className="flex w-full items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
								>
									<FaBook size="22" className="mt-1"/>
									<span>Create subject</span>
								</NavLink>
							</ul>
						</nav>
					</>
				) : (
					<>
						<nav>
							<ul>
								<li>
									<NavLink
										activeclassname="active"
										to={"/main"}
										className="flex w-[90%] items-center gap-5 py-2.5 px-4 rounded-r transition duration-200 hover:bg-primary/10"
									>
										<TbLetterQ className="mt-1" size="20"/>
										<span>Main</span>
									</NavLink>
								</li>
							</ul>
						</nav>
					</>
				)}
			</div>
		</div>
	);
};

export default Sidebar;