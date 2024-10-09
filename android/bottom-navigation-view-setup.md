---
head:
  - - meta
    - property: og:title
      content: Setting up bottom navigation view in Android
  - - meta
    - property: og:description
      content: Learn how to set up bottom navigation view in Android using the Navigation component.
  - - meta
    - property: og:image
      content: https://akib1689.github.io/Notes/images/kafka-on-kubernetes.png
  - - meta
    - property: og:url
      content: https://akib1689.github.io/Notes/kafka/deploy-part-1
  - - meta
    - name: twitter:card
      content: summary
---

# Setting up bottom navigation view in Android

Bottom navigation view is a common UI pattern in Android. It is used to switch between different sections of an app. In this post, we will learn how to set up bottom navigation view in Android using the Navigation component.

## Step 1: Add the Navigation component to your project

Add the Navigation component to your project by adding the following dependencies to your `libs.versions.toml` file:
  
```toml
[versions]
# Other versions
navigationFragment = "2.8.1"  # or the latest version
navigationUi = "2.8.1"

[libraries]
# Other libraries
navigation-fragment = { group = "androidx.navigation", name = "navigation-fragment", version.ref = "navigationFragment" }
navigation-ui = { group = "androidx.navigation", name = "navigation-ui", version.ref = "navigationUi" }
```

Then, add the following dependencies to your `build.gradle` file:

```gradle
dependencies {
  implementation libs.navigation.fragment
  implementation libs.navigation.ui
}
```

## Step 2: Create a new navigation graph

Create a new navigation graph by right-clicking on the `res` folder in the Project view, selecting `New` > `Android Resource File`, and choosing `Navigation` as the resource type. Name the file `bottom_nav_graph.xml`.

Add the following code to the `bottom_nav_graph.xml` file:

```xml
<?xml version="1.0" encoding="utf-8"?>
<?xml version="1.0" encoding="utf-8"?>
<navigation xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/bottom_nav_graph"
    app:startDestination="@id/navigation_home">
    <fragment
        android:id="@+id/navigation_home"
        android:name="com.example.myapp.DashboardFragment"
        android:label="fragment_dashboard"
        tools:layout="@layout/fragment_dashboard"/>
    <fragment
        android:id="@+id/navigation_sales"
        android:name="com.example.myapp.SalesFragment"
        android:label="fragment_sales"
        tools:layout="@layout/fragment_sales"/>
    <fragment
        android:id="@+id/navigation_inventory"
        android:name="com.example.myapp.InventoryFragment"
        android:label="fragment_inventory"
        tools:layout="@layout/fragment_inventory" />
    <fragment
        android:id="@+id/navigation_transaction"
        android:name="com.example.myapp.TransactionFragment"
        android:label="fragment_transaction"
        tools:layout="@layout/fragment_transaction" />
</navigation>
```

> [!NOTE]
> Remember to create the corresponding fragments for each destination in the navigation graph.

## Step 3: Add the corresponding menu items

Create a new menu resource file by right-clicking on the `res` folder in the Project view, selecting `New` > `Android Resource File`, and choosing `Menu` as the resource type. Name the file `bottom_nav_menu.xml`.

Add the following code to the `bottom_nav_menu.xml` file:

```xml
<menu xmlns:android="http://schemas.android.com/apk/res/android">
    <item
        android:id="@+id/navigation_home"
        android:icon="@drawable/ic_home"
        android:title="Home" />
    <item
        android:id="@+id/navigation_sales"
        android:icon="@drawable/ic_sales"
        android:title="Sales" />
    <item
        android:id="@+id/navigation_inventory"
        android:icon="@drawable/ic_inventory"
        android:title="Inventory" />
    <item
        android:id="@+id/navigation_transaction"
        android:icon="@drawable/ic_transaction"
        android:title="Transaction" />
</menu>
```

> [!IMPORTANT]
>
> - Remember to create the corresponding icons for each menu item.
> - The IDs of the menu items should match the IDs of the destinations in the navigation graph.
>   For example, notice the id of each item in the menu resource file and the id of each fragment in the navigation graph.

## Step 4: Add the BottomNavigationView to your layout

Add the `BottomNavigationView` to your layout file (e.g., `random_fragment.xml`):

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools">

    <data>

    </data>

    <androidx.constraintlayout.widget.ConstraintLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <androidx.fragment.app.FragmentContainerView
            android:id="@+id/fragment_container_view"
            android:layout_width="0dp"
            android:name="androidx.navigation.fragment.NavHostFragment"
            android:layout_height="0dp"
            app:layout_constraintBottom_toTopOf="@id/bottom_navigation"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:navGraph="@navigation/bottom_nav_graph"
            app:layout_constraintTop_toTopOf="parent" />


        <com.google.android.material.bottomnavigation.BottomNavigationView
            android:id="@+id/bottom_navigation"
            android:layout_width="match_parent"
            android:layout_height="?attr/actionBarSize"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:menu="@menu/bottom_nav_menu" />

    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```

> [!TIP]
> In this file you need to ensure this things:
>
> - The `app:navGraph` attribute of the `FragmentContainerView` should point to the navigation graph you created earlier.
> - The `app:menu` attribute of the `BottomNavigationView` should point to the menu resource file you created earlier.
> - The `android:name` attribute of the `FragmentContainerView` should be set to `androidx.navigation.fragment.NavHostFragment`.

## Step 5: Set up the Navigation component in your fragment

Set up the Navigation component in your fragment by adding the following code to your fragment class:

```java
  // find the navigation view
  BottomNavigationView navigationView = landingBinding.bottomNavigation;

  // get the host fragment
  NavHostFragment navHostFragment = (NavHostFragment) getChildFragmentManager().findFragmentById(R.id.fragment_container_view);

  // set up the navigation with the nav controller
  if (navHostFragment != null) {
      Log.d(TAG, "onViewCreated: navHostFragment: " + navHostFragment);
      NavigationUI.setupWithNavController(navigationView, navHostFragment.getNavController());
  } else {
      Log.d(TAG, "onViewCreated: navHostFragment is null");
  }
```

> [!WARNING]
> Make sure to replace `landingBinding` with the name of your binding object.

That's it! You have successfully set up bottom navigation view in Android using the Navigation component. You can now switch between different sections of your app using the bottom navigation view.

> [!NOTE]
> **You might wonder why I have used fragment to show the demo instead of an activity?**
>
> The reason is that the Navigation component is designed to work with single activity architecture. So, in real world thre would be a login graph, a home graph. when a user successfully logs in we change the graph. and the destination of a navigation graph is a fragment. So, it is better to use fragment as the container of the bottom navigation view.

## Conclusion

In this post, we learned how to set up bottom navigation view in Android using the Navigation component. We created a new navigation graph, added the corresponding menu items, added the `BottomNavigationView` to our layout, and set up the Navigation component in our fragment. We hope you found this post helpful and that you can now easily set up bottom navigation view in your Android app.
